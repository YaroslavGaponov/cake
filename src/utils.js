
class Utils {

    static int32ToBytes(value) {
        return [
             (value & 0xff000000) >> 24,
             (value & 0x00ff0000) >> 16,
             (value & 0x0000ff00) >> 8,
             (value & 0x000000ff)
        ];        
    }
    static bytesToInt32(bytes) {
        let value = 0;
        for(let i=0; i<4; i++) {                
            value<<=8;
            value|=bytes[i];
        }
        return value;
    }

    static stringToBytes(string) {
        const array = [];
        for(let i=0; i<string.length; i++) {
            array.push(string.charCodeAt(i) >> 8);
            array.push(string.charCodeAt(i) & 0xff);                            
        }
        return array;
    }
    static bytesToString(bytes) {
        const array = [];
        for(let i=0; i<bytes.length;i+=2) {
            const code = bytes[i]<<8 | bytes[i+1];
            array.push(String.fromCharCode(code));
        }
        return array.join('');        
    }

    static booleanToBytes(value) {
        return [value ? 0xff : 0];
    }
    
    static bytesToBoolean(bytes) {
        return bytes[0] ? true : false;
    }
}

module.exports = Utils;