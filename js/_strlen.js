// Adapted from https://mths.be/punycode
export default str => {
    let i = 0, len = 0;

    while (i < str.length) {
        const value = str.charCodeAt(i++);

        if (value >= 0xD800 && value <= 0xDBFF && i < str.length) {
            // It's a high surrogate, and there is a next character.
            const extra = str.charCodeAt(i++);

            // Low surrogate.
            if ((extra & 0xFC00) == 0xDC00) {
                len++;
            }
            else {
                // It's an unmatched surrogate; only append this code unit, in
                // case the next code unit is the high surrogate of a
                // surrogate pair.
                len++;
                i--;
            }
        }
        else {
            len++;
        }
    }

    return len;
};
