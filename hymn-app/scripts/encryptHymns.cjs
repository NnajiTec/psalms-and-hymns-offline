const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'src', 'data', 'hymns.json');
const outPath = path.join(__dirname, '..', 'src', 'data', 'hymnsEncoded.ts');

const raw = fs.readFileSync(srcPath, 'utf8');
const key = [0x74, 0x62, 0x63, 0x5F, 0x73, 0x61, 0x63, 0x72, 0x65, 0x64, 0x5F, 0x68, 0x79, 0x6D, 0x6E, 0x73]; // 'tbc_sacred_hymns'
const buf = Buffer.from(raw, 'utf8');
for (let i = 0; i < buf.length; i++) {
  buf[i] ^= key[i % key.length];
}
const b64 = buf.toString('base64');
const tsContent = '/* Protected Encrypted Sacred Hymnal Data Payload */\nexport const ENCRYPTED_HYMNS_PAYLOAD = ' + JSON.stringify(b64) + ';\n';
fs.writeFileSync(outPath, tsContent, 'utf8');
console.log('Successfully generated hymnsEncoded.ts with', b64.length, 'scrambled chars');
