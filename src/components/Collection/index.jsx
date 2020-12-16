import React from 'react';
import {
    func,
    shape,
    number,
    arrayOf,
    string,
} from 'prop-types';

import FullCard from './Cards/Full';
import { cardType } from './types/card';
import { getByPath } from './Helpers/general';
import AspectRatio1to1Card from './Cards/1-1';
import AspectRatio3to2Card from './Cards/3-2';
import {
    CARD_STYLES,
    DEFAULT_SHOW_ITEMS_PER_PAGE,
} from './Helpers/constants';

const collectionType = {
    pages: number,
    locale: string,
    cardStyle: string,
    dateFormat: string,
    paginationType: string,
    resultsPerPage: number,
    cards: arrayOf(shape(cardType)),
    onCardBookmark: func.isRequired,
};

const defaultProps = {
    pages: 1,
    cards: [],
    locale: '',
    cardStyle: '',
    dateFormat: '',
    paginationType: '',
    resultsPerPage: DEFAULT_SHOW_ITEMS_PER_PAGE,
};

/**
 * Contains a collection of cards (of different styles)
 *
 * @component
 * @example
 * const props= {
    resultPerPage: Int,
    pages: Int,
    onCardBookmark: Boolean,
    cards: [],
 * }
 * return (
 *   <Collection {...props}/>
 * )
 */
const Collection = ({
    cards,
    pages,
    locale,
    cardStyle,
    dateFormat,
    resultsPerPage,
    onCardBookmark,
    paginationType,
}) => {
    /**
     * Whether the paginator component is being used
     * @type {Boolean}
     */
    const isPaginator = paginationType === 'paginator';
    const isLoadMore = paginationType === 'loadMore';

    /**
     * Total pages to show (used if paginator component is set)
     * @type {Number}
     */
    const totalPages = resultsPerPage * pages;

    /**
     * The final cards to show in the collection
     * @type {Array}
     */
    let cardsToshow = cards;

    /**
     * Current page (used if paginator component is authored)
     * @type {Number}
     */
    const currentPage = resultsPerPage * (pages - 1);

    if (isPaginator) {
        cardsToshow = cards.slice(currentPage, totalPages);
    }

    /**
     * Current page (used if load more button is authored)
     * @type {Number}
     */
    if (isLoadMore) {
        cardsToshow = cards.slice(0, resultsPerPage * pages);
    }

    return cardsToshow.length > 0 && (
        <div
            data-testid="consonant-collection"
            className="consonant-card-collection">
            <div className="consonant-card-collection--inner">
                {cardsToshow.map((card, index) => {
                    const cardProps = { ...card, dateFormat, locale };

                    const cardStyleOverride = getByPath(card, 'styles.typeOverride');
                    const collectionCardStyle = cardStyle || cardStyleOverride;

                    if (collectionCardStyle === CARD_STYLES.CUSTOM) {
                        if (window.renderCustomCard) {
                            return window.renderCustomCard(...card);
                        }
                    } else if (collectionCardStyle === CARD_STYLES.FULL) {
                        return (
                            <FullCard
                                lh={`Card ${index} | ${card.contentArea.title}`}
                                key={card.id}
                                {...cardProps} />
                        );
                    } else if (collectionCardStyle === CARD_STYLES.SQUARE) {
                        return (
                            <AspectRatio1to1Card
                                lh={`Card ${index} | ${card.contentArea.title}`}
                                key={card.id}
                                {...cardProps} />
                        );
                    }
                    return (
                        <AspectRatio3to2Card
                            lh={`Card ${index} | ${card.contentArea.title}`}
                            key={card.id}
                            {...cardProps}
                            onClick={onCardBookmark}
                            locale={locale} />
                    );
                })}
                <div className="consonant-card-collection--placeholder" />
                <div className="consonant-card-collection--placeholder" />
            </div>
        </div>
    );
};

Collection.propTypes = collectionType;
Collection.defaultProps = defaultProps;

export default Collection;
