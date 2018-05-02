import React, { Component } from 'react';
import Arrow from './Arrow';
import Pagination from './Pagination';
import PropTypes from 'prop-types';

const getCurrentBoundaries = ({ sortedAxis, breakpoint, first, last, breakPointIndex }) => {
	if (first === breakpoint) return { before: null, after: sortedAxis[1] };
	if (last === breakpoint) return { before: sortedAxis[sortedAxis.length - 2], after: null };
	return { before: sortedAxis[breakPointIndex - 1], after: sortedAxis[breakPointIndex + 1] };
};

const getBreakpointConfig = ({ config, slidesToScroll, slidesVisible }) => {
	if (!config)
		return {
			slidesToScroll,
			slidesVisible
		};

	const breakpoint = Number(window.innerWidth);
	const breakpointAxis = Object.keys(config);

	const { max, min } = breakpointAxis.reduce(
		(acc, item) => ({
			min: (item < acc.min && item) || acc.min,
			max: (item > acc.max && item) || acc.max
		}),
		{ min: breakpointAxis[0], max: breakpointAxis[0] }
	);

	const sortedAxis =
		breakpoint == min
			? [ breakpoint, ...breakpointAxis ].sort((a, b) => (Number(a) > Number(b) ? 1 : -1))
			: [ ...breakpointAxis, breakpoint ].sort((a, b) => (Number(a) > Number(b) ? 1 : -1));

	const [ first, last ] = [ sortedAxis[0], sortedAxis[sortedAxis.length - 1] ];

	const breakPointIndex = sortedAxis.indexOf(breakpoint);

	const { before, after } = getCurrentBoundaries({ sortedAxis, breakpoint, first, last, breakPointIndex });

	if (after && before) return config[before];
	return config[after] || config[before];
};

class Slider extends Component {
	constructor(props) {
		super(props);
		const effectiveConfig = getBreakpointConfig(props);
		this.state = {
			currentItem: 0,
			...effectiveConfig
		};
	}

	componentDidMount = () => {
		this.props.config && window.addEventListener('resize', this.resize);
	};

	componentWillUnmount = () => this.props.config && window.removeEventListener('resize', this.resize);

	resize = () => {
		const nextConfig = getBreakpointConfig(this.props);
		this.setState(nextConfig);
	};

	gotoItem = (index) => {
		const { children, loop } = this.props;
		const { currentItem, slidesVisible } = this.state;
		const childrenLength = children.length;

		if (index < 0) {
			if (loop) {
				index = childrenLength - slidesVisible;
			} else {
				return;
			}
		} else if (
			index >= childrenLength ||
			(children[currentItem + slidesVisible] === undefined && index > currentItem)
		) {
			if (loop) {
				index = 0;
			} else {
				return;
			}
		}
		let translateX = index * -100 / childrenLength;
		this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
		this.setState({
			currentItem: index
		});
	};

	next = () => {
		this.gotoItem(this.state.currentItem + this.state.slidesToScroll);
	};

	prev = () => {
		this.gotoItem(this.state.currentItem - this.state.slidesToScroll);
	};

	render() {
		const { children } = this.props;
		const { currentItem, slidesVisible, slidesToScroll } = this.state;

		const ratio = children.length / slidesVisible;
		const containerStyle = {
			width: `${ratio * 100}%`
		};
		const childrenStyle = {
			width: `${100 / slidesVisible / ratio}%`
		};

		const leftIemsCount = children.length - (this.state.currentItem + slidesVisible);

		return (
			<div className="carousel">
				<Arrow className="carousel__next" handleClick={this.next} disabled={leftIemsCount <= 0} />
				<Arrow className="carousel__prev" handleClick={this.prev} />
				<Pagination
					onMove={this.gotoItem}
					slidesToScroll={slidesToScroll}
					currentItem={currentItem}
					childrenLength={children.length}
					slidesToShow={slidesVisible}
				/>
				<div className="carousel__container" style={containerStyle} ref={(c) => (this.container = c)}>
					{this.props.children.map((child, index) =>
						React.cloneElement(
							<div className="carousel__item" style={childrenStyle} key={index}>
								{child}
							</div>,
							{}
						)
					)}
				</div>
			</div>
		);
	}
}

Slider.defaultProps = {
	slidesToScroll: 1,
	slidesVisible: 1,
	loop: false,
	pagination: false,
	navigation: false
};

Slider.propTypes = {
	slidesToScroll: PropTypes.number,
	slidesVisible: PropTypes.number,
	loop: PropTypes.bool,
	pagination: PropTypes.bool,
	navigation: PropTypes.bool,
	config: PropTypes.object
};

export default Slider;
