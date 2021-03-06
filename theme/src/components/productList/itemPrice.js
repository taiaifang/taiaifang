import React from 'react';
import { themeSettings, text } from '../../lib/settings';
import * as helper from '../../lib/helper';

const FormattedCurrency = ({ number, settings }) =>
	helper.formatCurrency(number, settings);

const ItemPrice = ({ product, settings }) => {
	let priceStyle = {};
	if (themeSettings.list_price_size && themeSettings.list_price_size > 0) {
		priceStyle.fontSize = themeSettings.list_price_size + 'px';
	}
	if (
		themeSettings.list_price_color &&
		themeSettings.list_price_color.length > 0
	) {
		priceStyle.color = themeSettings.list_price_color;
	}

	if (product.stock_status === 'discontinued') {
		return <div className="product-price">{text.discontinued}</div>;
	} else if (product.stock_status === 'out_of_stock') {
		return <div className="product-price">{text.outOfStock}</div>;
	} else if (product.on_sale) {
		return (
			<div className="product-price">
				<span className="product-new-price">
					<FormattedCurrency settings={settings} number={product.price} />
				</span>
				<del className="product-old-price">
					<FormattedCurrency
						settings={settings}
						number={product.regular_price}
					/>
				</del>
			</div>
		);
	} else {
		return (
			<div className="product-price" style={priceStyle}>
				<FormattedCurrency settings={settings} number={product.price} />
				（约¥{product.price / 50000}万元）
			</div>
		);
	}
};

export default ItemPrice;
