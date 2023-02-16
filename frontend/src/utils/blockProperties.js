import useStore from "../store";
class BlockProperties {
	constructor(options) {
		Object.assign(this, options);
		this.blockId = this.blockId || this.generateId();
		if (this.children && this.children.length) {
			this.children = this.children.map(child => new BlockProperties(child));
		}
		this.mobileStyles = this.mobileStyles || {};
		this.tabletStyles = this.tabletStyles || {};
	}
	isImage() {
		return this.element === "img";
	}
	isText() {
		return this.element === "span";
	}
	isContainer() {
		return this.element === "section";
	}
	setStyle(style, value) {
		const store = useStore();
		if (store.activeBreakpoint === "mobile") {
			this.mobileStyles[style] = value;
			return;
		} else if (store.activeBreakpoint === "tablet") {
			this.tabletStyles[style] = value;
			return;
		}
		this.styles[style] = value;
	}
	generateId() {
		return Math.random().toString(36).substr(2, 9);
	}
}

export default BlockProperties;