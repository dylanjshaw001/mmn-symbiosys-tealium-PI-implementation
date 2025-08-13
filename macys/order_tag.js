// Minimal SHA-256 implementation (optimized for string to hex hash conversion)
var jsSHA256 = (function() {
    var K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
             0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
             0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
             0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
             0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
             0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
             0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
             0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    
    function rotr(x,n){return x>>>n|x<<32-n}
    function ch(x,y,z){return x&y^~x&z}
    function maj(x,y,z){return x&y^x&z^y&z}
    function sigma0(x){return rotr(x,2)^rotr(x,13)^rotr(x,22)}
    function sigma1(x){return rotr(x,6)^rotr(x,11)^rotr(x,25)}
    function gamma0(x){return rotr(x,7)^rotr(x,18)^x>>>3}
    function gamma1(x){return rotr(x,17)^rotr(x,19)^x>>>10}
    
    function utf8Encode(str) {
        var bytes = [];
        for(var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if(c < 0x80) bytes.push(c);
            else if(c < 0x800) {
                bytes.push(0xc0|(c>>6));
                bytes.push(0x80|(c&0x3f));
            } else if(c < 0xd800 || c >= 0xe000) {
                bytes.push(0xe0|(c>>12));
                bytes.push(0x80|(c>>6&0x3f));
                bytes.push(0x80|(c&0x3f));
            } else {
                i++;
                c = 0x10000+(((c&0x3ff)<<10)|(str.charCodeAt(i)&0x3ff));
                bytes.push(0xf0|(c>>18));
                bytes.push(0x80|(c>>12&0x3f));
                bytes.push(0x80|(c>>6&0x3f));
                bytes.push(0x80|(c&0x3f));
            }
        }
        return bytes;
    }
    
    return function(input) {
        if(!input) return "";
        
        var bytes = utf8Encode(input);
        var bitLen = bytes.length * 8;
        var m = [];
        
        for(var i = 0; i < bytes.length; i++) {
            m[i>>2] |= bytes[i] << (24 - (i%4)*8);
        }
        
        m[bitLen>>5] |= 0x80 << (24 - bitLen%32);
        m[((bitLen+64>>9)<<4)+15] = bitLen;
        
        var H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,
                 0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
        
        for(var i = 0; i < m.length; i += 16) {
            var W = new Array(64);
            var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
            
            for(var t = 0; t < 64; t++) {
                if(t < 16) W[t] = m[i+t]|0;
                else W[t] = (gamma1(W[t-2]) + W[t-7] + gamma0(W[t-15]) + W[t-16])|0;
                
                var T1 = (h + sigma1(e) + ch(e,f,g) + K[t] + W[t])|0;
                var T2 = (sigma0(a) + maj(a,b,c))|0;
                h=g; g=f; f=e; e=(d+T1)|0; d=c; c=b; b=a; a=(T1+T2)|0;
            }
            
            H[0]=(H[0]+a)|0; H[1]=(H[1]+b)|0; H[2]=(H[2]+c)|0; H[3]=(H[3]+d)|0;
            H[4]=(H[4]+e)|0; H[5]=(H[5]+f)|0; H[6]=(H[6]+g)|0; H[7]=(H[7]+h)|0;
        }
        
        var hex = "";
        for(var i = 0; i < 8; i++) {
            for(var j = 28; j >= 0; j -= 4) {
                hex += ((H[i]>>j)&0xf).toString(16);
            }
        }
        return hex;
    };
})();

//~~tv:20010.20230630
//~~tc: Tealium Custom Container
//~~tc: Updated Tealium loader to 4.35 version

/*
  Tealium Custom Container Notes:
  - Add sending code between "Start Tag Sending Code" and "End Tag Sending Code".
  - Add JavaScript tag library code between "Start Tag Library Code" and "End Tag Library Code".
  - Add JavaScript code only, do not add HTML code in this file.
  - Remove any <script> and </script> tags from the code you place in this file.
  ...
*/

/* Start Tag Library Code */
/* End Tag Library Code */

try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;

        // Please do not modify
        if (utag.ut === undefined) { utag.ut = {}; }
        // Start Tealium loader 4.35
        if (utag.ut.loader === undefined) {
            u.loader = function (o) { /* ... existing loader code ... */ };
        } else {
            u.loader = utag.ut.loader;
        }
        // End Tealium loader

        u.ev = { view: 1 };
        u.initialized = false;

        // ——— SYMBIOSYS PI DATA & HASHING LIBRARY ———

        // Map object with PI Data
        u.map = {
            "cp.utag_main__st": "ts",
            "cp.utag_main_v_id": "vid",
            "cp.utag_main_ses_id": "sid",
            "cp.macys_online_guid": "crmid",
            "dom.url": "page_url",

            "symProdIDs": "prodid", // where is this getting set?
            "symQuantity": "qty", // where is this getting set?
            "symProductPrice": "regunitpr", // where is this getting set?
            "symDiscountPrice": "disunitpr", // where is this getting set?
            "customer_email_sha256": "hashed_email", // where is customer_email_sha256 getting set?
            "order_id": "oid",

            // "sym_hashed_phone_user": "hashed_phone_user",
            "sym_hashed_phone": "hashed_phone",
            // "sym_hashed_phone_e164_user": "hashed_phone_e164_user",
            "sym_hashed_phone_e164": "hashed_phone_e164",
            // "sym_hashed_first_name_user": "hashed_first_name_user",
            "sym_hashed_first_name": "hashed_first_name",
            // "sym_hashed_last_name_user": "hashed_last_name_user",
            "sym_hashed_last_name": "hashed_last_name",
            // "sym_hashed_date_of_birth_user": "hashed_date_of_birth_user",
            "sym_hashed_date_of_birth": "hashed_date_of_birth",
            // "sym_hashed_zip_code_user": "hashed_zip_code_user",
            "sym_hashed_zip_code": "hashed_zip_code",
            // "sym_hashed_city_user": "hashed_city_user",
            "sym_hashed_city": "hashed_city",
            // "sym_hashed_state_user": "hashed_state_user",
            "sym_hashed_state": "hashed_state",
        };

        // SYMBIOSYS PI DATA PROCESSING LOGIC START

        // Utility function for SHA-256 hashing
        u.sha256Hex = function (input) {
            if (!input || typeof input === "string" && !input.trim()) return "";
            if (typeof jsSHA256 !== "undefined") return jsSHA256(input);
            return "";
        };

        // Detect if a string is already a SHA-256 hash
        u.isHashed = function (value) {
            return typeof value === 'string' &&
                /^[a-f0-9]{64}$/.test(value.trim().toLowerCase());
        };

        // Format phone numbers to standardized formats
        u.formatPhoneNumber = function (rawPhone) {
            var cleaned = rawPhone.replace(/\D/g, '');
            var nationalFormat = '1' + cleaned;       // US country code
            var e164Format = '+' + nationalFormat;
            return { nationalFormat, e164Format };
        };

        // Process personal identifiable information for hashing
        u.processPiData = function (b) {
            // Process all non-phone attributes
            Object.keys(u.piAttributes).forEach(function (key) {
                if (key.includes('phone')) return;
                var rawValue = u.piAttributes[key];
                u.piAttributes[key] = rawValue
                    ? (u.isHashed(rawValue)
                        ? rawValue
                        : u.sha256Hex(rawValue))
                    : '';
            });

            // Utility function to process phone fields
            var processPhone = function (rawPhone) {
                if (u.isHashed(rawPhone)) {
                    return {
                        national: rawPhone,
                        e164: rawPhone
                    };
                } else if (rawPhone) {
                    var fmt = u.formatPhoneNumber(rawPhone);
                    return {
                        national: u.sha256Hex(fmt.nationalFormat),
                        e164: u.sha256Hex(fmt.e164Format)
                    };
                } else {
                    return {
                        national: '',
                        e164: ''
                    };
                }
            };

            // Process user-level phone
            var phoneUser = processPhone(u.piAttributes.sym_hashed_phone_user);
            u.piAttributes.sym_hashed_phone_user = phoneUser.national;
            u.piAttributes.sym_hashed_phone_e164_user = phoneUser.e164;

            // Process order-level phone
            var phoneGeneral = processPhone(u.piAttributes.sym_hashed_phone);
            u.piAttributes.sym_hashed_phone = phoneGeneral.national;
            u.piAttributes.sym_hashed_phone_e164 = phoneGeneral.e164;

            // Merge back into the utag data object
            Object.assign(b, u.piAttributes);
        };
        // SYMBIOSYS PI DATA PROCESSING LOGIC END

        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f;

                u.data = {
                    "qsp_delim": "" || "&",
                    "kvp_delim": "" || "=",
                    "qs_delim": "" || "?",
                    "tag_type": "img",
                    "base_url": "https://event.symbiosys.ai/orderjs", // PROD ENDPOINT
                    // "base_url": "https://event.symbiosys.dev/orderjs", // DEV ENDPOINT
                    "secure_base_url": "",
                    "static_params": "api_key=AIzaSyA99cxucWPy_ze5KUfmBwJSSZKfzrEbITY", // PROD API KEY
                    // "static_params": "api_key=AIzaSyDWKcAd0HdAqT0_Mv810AsRDVOlBYVeV-E", // DEV API KEY
                    "cachebust": "disabled",
                    "cachevar": "" || "_rnd",
                    "requestscriptonce": "disabled"
                };
                
                if(!u.extend){
                    u.extend = [];
                } 

                /* Start Tag-Scoped Extensions Code */
                /* Please Do Not Edit This Section */
                ##UTEXTEND##
                /* End Tag-Scoped Extensions Code */

                // SYMBIOSYS PI DATA PROCESSING START
                u.piAttributes = {
                    // sym_hashed_phone_user: b['PLACEHOLDER'] || '',
                    sym_hashed_phone: b['order_phone_number'] || '',
                    // sym_hashed_phone_e164_user: b['PLACEHOLDER'] || '',
                    sym_hashed_phone_e164: b['PLACEHOLDER'] || '',

                    // sym_hashed_date_of_birth_user: b['PLACEHOLDER'] || '',
                    sym_hashed_date_of_birth: b['PLACEHOLDER'] || '',

                    // sym_hashed_first_name_user: b['FirstName_Hashed'] || '',
                    sym_hashed_first_name: b['billingFirstName_Hashed'] || '',

                    // sym_hashed_last_name_user: b['LastName_Hashed'] || '',
                    sym_hashed_last_name: b['billingLastName_Hashed'] || '',

                    // sym_hashed_zip_code_user: b['postalCode'] || '',
                    sym_hashed_zip_code: b['billingZipCode'] || '',

                    // sym_hashed_city_user: b['PLACEHOLDER'] || '',
                    sym_hashed_city: b['customer_city'] || '',

                    // sym_hashed_state_user: b['PLACEHOLDER'] || '',
                    sym_hashed_state: b['customer_state'] || '',
                };
                u.processPiData(b);
                // SYMBIOSYS PI DATA PROCESSING END

                /* Start Mapping Code */
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                /* End Mapping Code */

                /* Start Tag Sending Code */
                // 1) collect all data-params into an array
                var qs = [];
                // include your static_params first
                if (u.data.static_params) {
                    u.data.static_params.split('&').forEach(function (p) { qs.push(p); });
                }
                // then include every mapped/dynamic param
                for (var key in u.data) {
                    if (!u.data.hasOwnProperty(key)) continue;
                    var val = u.data[key];
                    // skip our config props
                    if (['base_url', 'qs_delim', 'qsp_delim', 'kvp_delim', 'tag_type', 'static_params', 'cachebust', 'cachevar', 'requestscriptonce', 'secure_base_url'].indexOf(key) > -1) continue;
                    if (val != null && val !== '') {
                        qs.push(key + u.data.kvp_delim + encodeURIComponent(val));
                    }
                }
                // 2) build full URL
                var url = u.data.base_url
                    + u.data.qs_delim
                    + qs.join(u.data.qsp_delim);
                // 3) fire
                if (u.data.tag_type === 'img') {
                    (new Image()).src = url;
                } else {
                    u.loader({ type: 'script', src: url, id: 'utag_' + id });
                }
                /* End Tag Sending Code */

                /* Start Loader Callback Function */
                u.loader_cb = function () {
                    u.initialized = true;
                    /* Start Loader Callback Tag Sending Code */
                    //  Insert your post-Loader tag sending code here.
                    /* End Loader Callback Tag Sending Code */
                };
                /* End Loader Callback Function */

                /* Start Loader Function Call */
                //if (!u.initialized) {
                //u.loader({"type":"iframe","src":u.data.base_url + c.join(u.data.qsp_delim),"cb":u.loader_cb,"loc":"body","id":"utag_##UTID##"});
                //u.loader({"type":"script","src":u.data.base_url,"cb":u.loader_cb,"loc":"script","id":"utag_##UTID##"});
                //} else {
                //u.loader_cb();
                //}
                //u.loader({"type":"img","src":u.data.base_url + c.join(u.data.qsp_delim)});
                /* End Loader Function Call */

            }
        };
        utag.o[loader].loader.LOAD(id);
    })("##UTID##", "##UTLOADERID##");
} catch (error) {
    utag.DB(error);
}
// end tealium universal tag
