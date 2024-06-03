package main.kotlin

import java.io.*
import java.net.InetSocketAddress
import java.nio.ByteBuffer
import java.nio.channels.SelectionKey
import java.nio.channels.Selector
import java.nio.channels.ServerSocketChannel
import java.nio.channels.SocketChannel

fun main() {
    client()
}

fun client() {
    var size = 0
    val output = ByteArrayOutputStream()

    var channel = SocketChannel.open()
    channel.configureBlocking(false)
    if (!channel.isOpen) {
        channel = SocketChannel.open()
    }
    channel.connect(InetSocketAddress("localhost" /*"192.168.49.1"*/, 8888))
    while (!channel.finishConnect()) {
    }
    println("client: " + channel.remoteAddress.toString())

    while (true) {
        /*
        val fout = FileOutputStream(File("fout.3gpp"))
        size = receive(channel, output, fout, size, {
        }, {
            println("finished")
        })
         */

        val fin = FileInputStream(File("fin.3gpp"))
        send(channel, fin)

        readLine()
    }
}

fun server() {
    var size = 0
    val output = ByteArrayOutputStream()

    val serverChannel = ServerSocketChannel.open()
    serverChannel.configureBlocking(false)
    serverChannel.socket().bind(InetSocketAddress(8888))
    val selector = Selector.open()
    serverChannel.register(selector, SelectionKey.OP_ACCEPT)

    while (true) {
        selector.select()
        val keys = selector.selectedKeys()
        val iterator = keys.iterator()
        while (iterator.hasNext()) {
            val key = iterator.next()
            iterator.remove()
            if (key.isAcceptable) {
                val channel = serverChannel.accept()
                channel.configureBlocking(false)
                channel.register(selector, SelectionKey.OP_READ or SelectionKey.OP_WRITE)
                println("server: " + channel.remoteAddress.toString())
                continue
            }
            if (key.isReadable) {
                println("readable")
                val fout = FileOutputStream(File("fout.3gpp"))
                val channel = key.channel() as SocketChannel
                size = receive(channel, output, fout, size, {
                    println("receiving")
                }, {
                    println("finished")
                })
                continue
            }
            if (key.isWritable) {
                /*
                println("sending")
                val fin = FileInputStream(File("fin.3gpp"))
                val channel = key.channel() as SocketChannel
                send(channel, fin)
                readLine()
                */
                continue
            }
        }
    }
}

/* region fun */
fun receive(
    channel: SocketChannel,
    stream: ByteArrayOutputStream,
    output: OutputStream,
    _size: Int,
    onStarted: () -> Unit,
    onReady: () -> Unit
): Int {
    var size = _size
    val buffer = ByteBuffer.allocate(1024 * 512)
    val n = channel.read(buffer)
    buffer.flip()
    if (n < 1) {
        return size
    }
    onStarted()
    val byteArray = ByteArray(buffer.remaining())
    buffer.get(byteArray, 0, byteArray.size)
    stream.write(byteArray)
    if ((size < 1) and (stream.size() > 3)) {
        val bs = ByteBuffer.wrap(byteArray, 0, 4)
        size = bs.getInt() + 4
        println("size: " + size.toString() + " " + stream.size() + " " + byteArray.size)
    }
    if (size > 0) {
        size = size - n
        if (0 == size) {
            val ba = stream.toByteArray()
            println("receiving: " + size.toString() + " " + n.toString() + " " + ba.size.toString())
            output.write(ba, 4, ba.size - 4)
            output.flush()
            output.close()
            stream.reset()
            onReady()
        }
    }
    return size
}

fun send(channel: SocketChannel, input: InputStream) {
    val n = input.available()
    val sizeBuffer = ByteBuffer.allocate(Int.SIZE_BYTES + n)
    sizeBuffer.putInt(n)

    val byteArray = ByteArray(n)
    input.read(byteArray, 0, n)
    input.close()
    sizeBuffer.put(byteArray)

    sizeBuffer.flip()
    channel.write(sizeBuffer)

    //val bb = ByteBuffer.wrap(byteArray)
    //channel.write(bb)
    println("server sending")
}
/* endregion */