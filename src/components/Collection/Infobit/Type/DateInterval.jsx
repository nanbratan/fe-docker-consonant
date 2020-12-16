import React from 'react';
import { string } from 'prop-types';

import getPrettyDateInterval from '../../Helpers/prettyFormat';

const dateIntervalType = {
    locale: string.isRequired,
    endTime: string.isRequired,
    startTime: string.isRequired,
    dateFormat: string.isRequired,
};

/**
 * Date Interval Infobit (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= {
    startTime: String,
    endTime: String,
    locale: String,
    dateFormat: String,
 * }
 * return (
 *   <DateInterval {...props}/>
 * )
 */
const DateInterval = ({
    startTime,
    endTime,
    locale,
    dateFormat,
}) => {
    const prettyDateInterval = getPrettyDateInterval(startTime, endTime, locale, dateFormat);
    return (
        <span
            title={prettyDateInterval}
            className="consonant-date-interval-infobit">
            {prettyDateInterval}
        </span>
    );
};

DateInterval.propTypes = dateIntervalType;

export default DateInterval;
