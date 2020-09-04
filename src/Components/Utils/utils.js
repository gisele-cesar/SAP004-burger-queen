import React from 'react';

const FormatDate = (dateOrder) => {
    if (dateOrder != null) {
        const options = {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
            second: '2-digit'
        };
        return new Date(dateOrder).toLocaleString([], options);
    }
}

export default FormatDate;