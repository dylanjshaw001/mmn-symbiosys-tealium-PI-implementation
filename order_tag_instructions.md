1. Open code editor for Symbiosys Order tag template (Tealium Custom Container).

2. The below is a minified SHA hashing library. Paste this at the very top of your tag template.
```
var jsSHA256 = (function () {
    var __extends = this && this.__extends || function () { var extendStatics = function (d, b) { extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; } || function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; }; return extendStatics(d, b); }; return function (d, b) { if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null"); extendStatics(d, b); function __() { this.constructor = d; } d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __()); }; }();
    function str2packed(str, utfType, existingPacked, existingPackedLen, bigEndianMod) { var codePnt, codePntArr, byteCnt = 0, i, j, intOffset, byteOffset, shiftModifier, transposeBytes; existingPackedLen = existingPackedLen || 0; var packed = existingPacked || [0], existingByteLen = existingPackedLen >>> 3; if ("UTF8" === utfType) { shiftModifier = bigEndianMod === -1 ? 3 : 0; for (i = 0; i < str.length; i += 1) { codePnt = str.charCodeAt(i); codePntArr = []; if (128 > codePnt) { codePntArr.push(codePnt); } else if (2048 > codePnt) { codePntArr.push(192 | codePnt >>> 6); codePntArr.push(128 | codePnt & 63); } else if (55296 > codePnt || 57344 <= codePnt) { codePntArr.push(224 | codePnt >>> 12, 128 | codePnt >>> 6 & 63, 128 | codePnt & 63); } else { i += 1; codePnt = 65536 + ((codePnt & 1023) << 10 | str.charCodeAt(i) & 1023); codePntArr.push(240 | codePnt >>> 18, 128 | codePnt >>> 12 & 63, 128 | codePnt >>> 6 & 63, 128 | codePnt & 63); } for (j = 0; j < codePntArr.length; j += 1) { byteOffset = byteCnt + existingByteLen; intOffset = byteOffset >>> 2; while (packed.length <= intOffset) { packed.push(0); } packed[intOffset] |= codePntArr[j] << 8 * (shiftModifier + bigEndianMod * (byteOffset % 4)); byteCnt += 1; } } } else { shiftModifier = bigEndianMod === -1 ? 2 : 0; transposeBytes = "UTF16LE" === utfType && bigEndianMod !== 1 || "UTF16LE" !== utfType && bigEndianMod === 1; for (i = 0; i < str.length; i += 1) { codePnt = str.charCodeAt(i); if (transposeBytes === true) { j = codePnt & 255; codePnt = j << 8 | codePnt >>> 8; } byteOffset = byteCnt + existingByteLen; intOffset = byteOffset >>> 2; while (packed.length <= intOffset) { packed.push(0); } packed[intOffset] |= codePnt << 8 * (shiftModifier + bigEndianMod * (byteOffset % 4)); byteCnt += 2; } } return { value: packed, binLen: byteCnt * 8 + existingPackedLen }; }
    function getStrConverter(format, utfType, bigEndianMod) { return function (str, existingBin, existingBinLen) { return str2packed(str, utfType, existingBin, existingBinLen, bigEndianMod); }; }
    function packed2hex(packed, outputLength, bigEndianMod, formatOpts) { const hex_tab = "0123456789abcdef"; let str = "", i, srcByte; const length = outputLength / 8, shiftModifier = bigEndianMod === -1 ? 3 : 0; for (i = 0; i < length; i += 1) { srcByte = packed[i >>> 2] >>> 8 * (shiftModifier + bigEndianMod * (i % 4)); str += hex_tab.charAt(srcByte >>> 4 & 15) + hex_tab.charAt(srcByte & 15); } return formatOpts["outputUpper"] ? str.toUpperCase() : str; }
    function getOutputConverter(format, outputBinLen, bigEndianMod, outputOptions) { return function (binarray) { return packed2hex(binarray, outputBinLen, bigEndianMod, outputOptions); }; }
    var TWO_PWR_32 = 4294967296;
    var K_sha2 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
    var H_full = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    function getOutputOpts(options) { var retVal = { outputUpper: false, b64Pad: "=", outputLen: -1 }, outputOptions = options || {}, lenErrstr = "Output length must be a multiple of 8"; retVal["outputUpper"] = outputOptions["outputUpper"] || false; if (outputOptions["b64Pad"]) { retVal["b64Pad"] = outputOptions["b64Pad"]; } if (outputOptions["outputLen"]) { if (outputOptions["outputLen"] % 8 !== 0) { throw new Error(lenErrstr); } retVal["outputLen"] = outputOptions["outputLen"]; } else if (outputOptions["shakeLen"]) { if (outputOptions["shakeLen"] % 8 !== 0) { throw new Error(lenErrstr); } retVal["outputLen"] = outputOptions["shakeLen"]; } if ("boolean" !== typeof retVal["outputUpper"]) { throw new Error("Invalid outputUpper formatting option"); } if ("string" !== typeof retVal["b64Pad"]) { throw new Error("Invalid b64Pad formatting option"); } return retVal; }
    var jsSHABase = function () { function class_1(variant, inputFormat, options) { var inputOptions = options || {}; this.inputFormat = inputFormat; this.utfType = inputOptions["encoding"] || "UTF8"; this.numRounds = inputOptions["numRounds"] || 1; if (isNaN(this.numRounds) || this.numRounds !== parseInt(this.numRounds, 10) || 1 > this.numRounds) { throw new Error("numRounds must a integer >= 1"); } this.shaVariant = variant; this.remainder = []; this.remainderLen = 0; this.updateCalled = false; this.processedLen = 0; this.macKeySet = false; this.keyWithIPad = []; this.keyWithOPad = []; } class_1.prototype.update = function (srcString) { var i, updateProcessedLen = 0; var variantBlockIntInc = this.variantBlockSize >>> 5, convertRet = this.converterFunc(srcString, this.remainder, this.remainderLen), chunkBinLen = convertRet["binLen"], chunk = convertRet["value"], chunkIntLen = chunkBinLen >>> 5; for (i = 0; i < chunkIntLen; i += variantBlockIntInc) { if (updateProcessedLen + this.variantBlockSize <= chunkBinLen) { this.intermediateState = this.roundFunc(chunk.slice(i, i + variantBlockIntInc), this.intermediateState); updateProcessedLen += this.variantBlockSize; } } this.processedLen += updateProcessedLen; this.remainder = chunk.slice(updateProcessedLen >>> 5); this.remainderLen = chunkBinLen % this.variantBlockSize; this.updateCalled = true; return this; }; class_1.prototype.getHash = function (format, options) { var i, finalizedState, outputBinLen = this.outputBinLen; var outputOptions = getOutputOpts(options); if (this.isVariableLen) { if (outputOptions["outputLen"] === -1) { throw new Error("Output length must be specified in options"); } outputBinLen = outputOptions["outputLen"]; } var formatFunc = getOutputConverter(format, outputBinLen, this.bigEndianMod, outputOptions); if (this.macKeySet && this.getMAC) { return formatFunc(this.getMAC(outputOptions)); } finalizedState = this.finalizeFunc(this.remainder.slice(), this.remainderLen, this.processedLen, this.stateCloneFunc(this.intermediateState), outputBinLen); for (i = 1; i < this.numRounds; i += 1) { if (this.isVariableLen && outputBinLen % 32 !== 0) { finalizedState[finalizedState.length - 1] &= 16777215 >>> 24 - outputBinLen % 32; } finalizedState = this.finalizeFunc(finalizedState, outputBinLen, 0, this.newStateFunc(this.shaVariant), outputBinLen); } return formatFunc(finalizedState); }; return class_1; }();
    function rotr_32(x, n) { return x >>> n | x << 32 - n; }
    function shr_32(x, n) { return x >>> n; }
    function ch_32(x, y, z) { return x & y ^ ~x & z; }
    function maj_32(x, y, z) { return x & y ^ x & z ^ y & z; }
    function sigma0_32(x) { return rotr_32(x, 2) ^ rotr_32(x, 13) ^ rotr_32(x, 22); }
    function safeAdd_32_2(a, b) { var lsw = (a & 65535) + (b & 65535), msw = (a >>> 16) + (b >>> 16) + (lsw >>> 16); return (msw & 65535) << 16 | lsw & 65535; }
    function safeAdd_32_4(a, b, c, d) { var lsw = (a & 65535) + (b & 65535) + (c & 65535) + (d & 65535), msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (lsw >>> 16); return (msw & 65535) << 16 | lsw & 65535; }
    function safeAdd_32_5(a, b, c, d, e) { var lsw = (a & 65535) + (b & 65535) + (c & 65535) + (d & 65535) + (e & 65535), msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16) + (lsw >>> 16); return (msw & 65535) << 16 | lsw & 65535; }
    function gamma1_32(x) { return rotr_32(x, 17) ^ rotr_32(x, 19) ^ shr_32(x, 10); }
    function gamma0_32(x) { return rotr_32(x, 7) ^ rotr_32(x, 18) ^ shr_32(x, 3); }
    function sigma1_32(x) { return rotr_32(x, 6) ^ rotr_32(x, 11) ^ rotr_32(x, 25); }
    function getNewState256() { return H_full.slice(); }
    function roundSHA256(block, H) { var a, b, c, d, e, f, g, h, T1, T2, t; var W = []; a = H[0]; b = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7]; for (t = 0; t < 64; t += 1) { if (t < 16) { W[t] = block[t]; } else { W[t] = safeAdd_32_4(gamma1_32(W[t - 2]), W[t - 7], gamma0_32(W[t - 15]), W[t - 16]); } T1 = safeAdd_32_5(h, sigma1_32(e), ch_32(e, f, g), K_sha2[t], W[t]); T2 = safeAdd_32_2(sigma0_32(a), maj_32(a, b, c)); h = g; g = f; f = e; e = safeAdd_32_2(d, T1); d = c; c = b; b = a; a = safeAdd_32_2(T1, T2); } H[0] = safeAdd_32_2(a, H[0]); H[1] = safeAdd_32_2(b, H[1]); H[2] = safeAdd_32_2(c, H[2]); H[3] = safeAdd_32_2(d, H[3]); H[4] = safeAdd_32_2(e, H[4]); H[5] = safeAdd_32_2(f, H[5]); H[6] = safeAdd_32_2(g, H[6]); H[7] = safeAdd_32_2(h, H[7]); return H; }
    function finalizeSHA256(remainder, remainderBinLen, processedBinLen, H) { var i; var offset = (remainderBinLen + 65 >>> 9 << 4) + 15, binaryStringInc = 16, totalLen = remainderBinLen + processedBinLen; while (remainder.length <= offset) { remainder.push(0); } remainder[remainderBinLen >>> 5] |= 128 << 24 - remainderBinLen % 32; remainder[offset] = totalLen & 4294967295; remainder[offset - 1] = totalLen / TWO_PWR_32 | 0; for (i = 0; i < remainder.length; i += binaryStringInc) { H = roundSHA256(remainder.slice(i, i + binaryStringInc), H); } return H; }
    var jsSHA = function (_super) { __extends(class_2, _super); function class_2() { var _this = _super.call(this, "SHA-256", "TEXT", { encoding: "UTF8" }) || this; _this.bigEndianMod = -1; _this.converterFunc = getStrConverter("TEXT", "UTF8", _this.bigEndianMod); _this.roundFunc = roundSHA256; _this.stateCloneFunc = function (state) { return state.slice(); }; _this.newStateFunc = getNewState256; _this.finalizeFunc = function (remainder, remainderBinLen, processedBinLen, H) { return finalizeSHA256(remainder, remainderBinLen, processedBinLen, H); }; _this.intermediateState = getNewState256(); _this.variantBlockSize = 512; _this.outputBinLen = 256; _this.isVariableLen = false; return _this; } return class_2; }(jsSHABase);
    return function jsSHA256(input) {
        if (input == null) { return ""; }
        var SHA256 = new jsSHA();
        SHA256.update(input);
        var hash = SHA256.getHash("HEX");
        return hash;
    }
})();
```

2. Scroll to the `u.map = {...}` object definition. This object maps your data layer variables to tag parameters. Copy the existing object and replace with the below `u.map` object and DI Data processing logic  

```
// Map object with PI Data
u.map = {
  "cp.utag_main__st": "ts",
  "cp.utag_main_v_id": "vid",
  "cp.utag_main_ses_id": "sid",
  "cp.macys_online_guid": "crmid",
  "dom.url": "page_url",
  "prodid": "prodid",
  "symCategoryId": "category_id",
  "sym_hashed_phone_user": "hashed_phone_user",
  "sym_hashed_phone": "hashed_phone",
  "sym_hashed_phone_e164_user": "hashed_phone_e164_user",
  "sym_hashed_phone_e164": "hashed_phone_e164",
  "sym_hashed_first_name_user": "hashed_first_name_user",
  "sym_hashed_first_name": "hashed_first_name",
  "sym_hashed_last_name_user": "hashed_last_name_user",
  "sym_hashed_last_name": "hashed_last_name",
  "sym_hashed_date_of_birth_user": "hashed_date_of_birth_user",
  "sym_hashed_date_of_birth": "hashed_date_of_birth",
  "sym_hashed_zip_code_user": "hashed_zip_code_user",
  "sym_hashed_zip_code": "hashed_zip_code",
  "sym_hashed_city_user": "hashed_city_user",
  "sym_hashed_city": "hashed_city",
  "sym_hashed_state_user": "hashed_state_user",
  "sym_hashed_state": "hashed_state",
};

// SYMBIOSYS PI DATA PROCESSING LOGIC START

// Utility function for SHA-256 hashing
u.sha256Hex = function (input) {
    // Return early for empty or whitespace-only inputs
    if (!input || typeof input === "string" && !input.trim()) return "";

    // Try to use the jsSHA256 function if available
    if (typeof jsSHA256 !== "undefined") return jsSHA256(input);
    return "";
};

// Detect if a string is already a SHA-256 hash
u.isHashed = function (value) {
    return typeof value === 'string' && /^[a-f0-9]{64}$/.test(value.trim().toLowerCase());
};

// Format phone numbers to standardized formats
u.formatPhoneNumber = function (rawPhone) {
    var cleaned = rawPhone.replace(/\D/g, '');
    var nationalFormat = '1' + cleaned; // US country code
    var e164Format = '+' + nationalFormat;
    return { nationalFormat, e164Format };
};

// Utility function for filtering an object for key/value pairs with truthy values
u.filterTruthy = function (obj) {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => Boolean(value))
    );
}

// Process personal identifiable information for hashing
u.processPiData = function (b) {
    // Process all attributes except phone with hashed prefix
    Object.keys(u.piAttributes).forEach(function (key) {
        if (key.includes('phone')) return; // Skip phone here
        var rawValue = u.piAttributes[key];

        u.piAttributes[key] = rawValue ? (u.isHashed(rawValue) ? rawValue : u.sha256Hex(rawValue)) : '';
    });

    // Process phone_user (user-level)
    var phoneUser = u.piAttributes.sym_hashed_phone_user;
    if (u.isHashed(phoneUser)) {
        u.piAttributes['sym_hashed_phone_user'] = phoneUser;
        u.piAttributes['sym_hashed_phone_e164_user'] = phoneUser;
    } else if (phoneUser) {
        var formattedUserPhone = u.formatPhoneNumber(phoneUser);
        u.piAttributes['sym_hashed_phone_user'] = u.sha256Hex(formattedUserPhone.nationalFormat);
        u.piAttributes['sym_hashed_phone_e164_user'] = u.sha256Hex(formattedUserPhone.e164Format);
    } else {
        u.piAttributes['sym_hashed_phone_user'] = '';
        u.piAttributes['sym_hashed_phone_e164_user'] = '';
    }

    // Process phone (order-level)
    var phone = u.piAttributes.phone;
    if (u.isHashed(phone)) {
        u.piAttributes['sym_hashed_phone'] = phone;
        u.piAttributes['sym_hashed_phone_e164'] = phone;
    } else if (phone) {
        var formattedPhone = u.formatPhoneNumber(phone);
        u.piAttributes['sym_hashed_phone'] = u.sha256Hex(formattedPhone.nationalFormat);
        u.piAttributes['sym_hashed_phone_e164'] = u.sha256Hex(formattedPhone.e164Format);
    } else {
        u.piAttributes['sym_hashed_phone'] = '';
        u.piAttributes['sym_hashed_phone_e164'] = '';
    }

    Object.assign(b, u.piAttributes);

};
// SYMBIOSYS PI DATA PROCESSING LOGIC END
```

3. Inside the `u.send` function, after the `u.data` declaration paste the below code:

```
// SYMBIOSYS PI DATA PROCESSING START
    u.piAttributes = {
      sym_hashed_phone_user: b['PHONE_USER'] || '',
      sym_hashed_phone: b['PHONE'] || '',
      sym_hashed_date_of_birth_user: b['DATE_OF_BIRTH_USER'] || '',
      sym_hashed_date_of_birth: b['DATE_OF_BIRTH'] || '',
      sym_hashed_first_name_user: b['FIRST_NAME_USER'] || '',
      sym_hashed_first_name: b['FIRST_NAME'] || '',
      sym_hashed_last_name_user: b['LAST_NAME_USER'] || '',
      sym_hashed_last_name: b['LAST_NAME'] || '',
      sym_hashed_zip_code_user: b['ZIP_CODE_USER'] || '',
      sym_hashed_zip_code: b['ZIP_CODE'] || '',
      sym_hashed_city_user: b['CITY_USER'] || '',
      sym_hashed_city: b['CITY'] || '',
      sym_hashed_state_user: b['STATE_USER'] || '',
      sym_hashed_state: b['STATE'] || '',
    };
    u.processPiData(b);
// SYMBIOSYS PI DATA PROCESSING END
```

The start of `u.send` function should now look like the below (note: don't copy and paste this as this is just a preview of the function):

```
u.send = function (a, b) {
    if (u.ev[a] || u.ev.all !== undefined) {
        var c, d, e, f;
        u.data = {
            "qsp_delim": "" || "&",
            "kvp_delim": "" || "=",
            "qs_delim": "" || "?",
            "tag_type": "img",
            "base_url": "event.symbiosys.ai/page_viewjs",
            "secure_base_url": "",
            "static_params": "api_key=AIzaSyA99cxucWPy_ze5KUfmBwJSSZKfzrEbITY",
            "cachebust": "disabled",
            "cachevar": "" || "_rnd",
            "requestscriptonce": "disabled",
            "attribute": {}
        };

        // SYMBIOSYS PI DATA PROCESSING START
            u.piAttributes = {
              sym_hashed_phone_user: b['PHONE_USER'] || '',
              sym_hashed_phone: b['PHONE'] || '',
              sym_hashed_date_of_birth_user: b['DATE_OF_BIRTH_USER'] || '',
              sym_hashed_date_of_birth: b['DATE_OF_BIRTH'] || '',
              sym_hashed_first_name_user: b['FIRST_NAME_USER'] || '',
              sym_hashed_first_name: b['FIRST_NAME'] || '',
              sym_hashed_last_name_user: b['LAST_NAME_USER'] || '',
              sym_hashed_last_name: b['LAST_NAME'] || '',
              sym_hashed_zip_code_user: b['ZIP_CODE_USER'] || '',
              sym_hashed_zip_code: b['ZIP_CODE'] || '',
              sym_hashed_city_user: b['CITY_USER'] || '',
              sym_hashed_city: b['CITY'] || '',
              sym_hashed_state_user: b['STATE_USER'] || '',
              sym_hashed_state: b['STATE'] || '',
            };

            u.processPiData(b);
        // SYMBIOSYS PI DATA PROCESSING END

            ...
            ...
```

4. In `u.piAttributes` (above), replace the capitalized strings with the data layer variables that correspond to the PI data points. Be sure to use the same casing as your data layer. If the variable is not found in the data layer, pass an empty string.
