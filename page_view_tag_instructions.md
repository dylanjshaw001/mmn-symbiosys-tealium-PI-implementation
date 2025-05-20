1. Open code editor for Symbiosys Page View tag template (Tealium Custom Container).
2. scroll to the `u.map = {...}` object definition. This object maps your data layer variables to tag parameters. Copy the existing object and replace with the below `u.map` object and DI Data processing logic

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
            "sym_hashed_phone_e164_user": "hashed_phone_e164_user",
            "sym_hashed_date_of_birth_user": "hashed_date_of_birth_user",
            "sym_hashed_zip_code_user": "hashed_zip_code_user",
            "sym_hashed_city_user": "hashed_city_user",
            "sym_hashed_state_user": "hashed_state_user",
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
                        sym_hashed_date_of_birth_user: b['DATE_OF_BIRTH_USER'] || '',
                        sym_hashed_first_name_user: b['FIRST_NAME_USER'] || '',
                        sym_hashed_last_name_user: b['LAST_NAME_USER'] || '',
                        sym_hashed_zip_code_user: b['ZIP_CODE_USER'] || '',
                        sym_hashed_city_user: b['CITY_USER'] || '',
                        sym_hashed_state_user: b['STATE_USER'] || '',
                    };
    
                    u.processPiData(b);
                    // SYMBIOSYS PI DATA PROCESSING END
```

Your `u.send` function should now look like this:

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
                        sym_hashed_date_of_birth_user: b['DATE_OF_BIRTH_USER'] || '',
                        sym_hashed_first_name_user: b['FIRST_NAME_USER'] || '',
                        sym_hashed_last_name_user: b['LAST_NAME_USER'] || '',
                        sym_hashed_zip_code_user: b['ZIP_CODE_USER'] || '',
                        sym_hashed_city_user: b['CITY_USER'] || '',
                        sym_hashed_state_user: b['STATE_USER'] || '',
                    };
    
                    u.processPiData(b);
                    // SYMBIOSYS PI DATA PROCESSING END

                    ...
                    ...
```

4. In `u.piAttributes` (above), replace the capitalized strings with the data layer variables that correspond to the PI data points. Be sure to use the same casing as your data layer. If the variable is not found in the data layer, pass an empty string.
