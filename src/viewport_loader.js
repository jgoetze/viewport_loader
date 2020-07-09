/*
Executes various events, when the element comes to viewport
- "onviewport-style" sets a given style
- "onviewport-class" sets a given class
- "onviewport-src" sets a given source
Besides "on", "before" and "after" -viewport options are available. Those are triggered
within a 300px distance
 */

class ViewportLoader {

    constructor() {
        this.beforeClassPrefix = "beforeviewport";
        this.onClassPrefix     = "onviewport";
        this.afterClassPrefix  = "afterviewport";

        this.supportedAttributes = ['Src', 'Style', 'Class'];

        this.distanceTrigger = "200px";

        this.bound = false;
    }

    bind() {
        if (!window.IntersectionObserver) return this.instantInit();
        if (this.bound) return;

        this.bindObserver(this.beforeClassPrefix, `${this.distanceTrigger}`);
        this.bindObserver(this.onClassPrefix, `0px`);
        this.bindObserver(this.afterClassPrefix, `-${this.distanceTrigger}`);

        this.bound = true;
    }

    instantInit() {
        let vpl = this;
        [this.beforeClassPrefix, this.onClassPrefix, this.afterClassPrefix].forEach(function(prefix) {
            let objectsToWatch = vpl.getPrefixObjects(prefix);
            objectsToWatch.forEach(function(node) {
                vpl.executeLoading(node, prefix);
            });
        });
    }

    getPrefixSelector(prefix) {
        return this.supportedAttributes.map(function(attribute) {
            return `[data-${prefix}-${attribute}]`.toLowerCase();
        }).join(',');
    }

    getPrefixObjects(prefix) {
        return document.querySelectorAll(this.getPrefixSelector(prefix));
    }

    bindObserver(prefix, rootMargin) {
        let observer = new IntersectionObserver(

            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.executeLoading(entry.target, prefix);
                        observer.unobserve(entry.target);
                    }
                })
            },

            {
                rootMargin: rootMargin
            }
        );

        let objectsToWatch = this.getPrefixObjects(prefix);
        objectsToWatch.forEach(obj => { observer.observe(obj) });
    }

    executeLoading(node, prefix) {
        this.supportedAttributes.forEach(function(attribute) {
            let nodeAttribute = `${prefix}${attribute}`;
            if (node.dataset[nodeAttribute]) {
                node[attribute.toLowerCase()] = node.dataset[nodeAttribute];
                delete(node.dataset[nodeAttribute]);
            }
        });
    }

}

window.vpl = new ViewportLoader();
window.vpl.bind();