gpg --cipher-algo AES256 -a --output java.asc --symmetric java.zip

gpg --output java.zip -d java.asc