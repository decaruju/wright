window.wright = {
    rules: [
        {
            selector: '#hi',
            action: "delete",
        },
        {
            selector: '.empty',
            action: "addChild",
            html: "<span>not empty</span>"
        },
        {
            selector: '.warning',
            action: "replaceContent",
            html: "hello people"
        },
    ],
    addRule(rule) {
        this.rules.push(rule);
        if (this.isReady) {
            this.applyRule(rule);
        }
    },
    ready() {
        if (this.isReady) return;
        this.isReady = true;
        this.rules.forEach((rule) => {
            if (rule.applied) return;
            this.applyRule(rule);
            rule.applied = true;
        });
    },
    applyRule(rule) {
        switch (rule.action) {
        case "delete":
            document.querySelectorAll(rule.selector).forEach((element) => {
                element.remove();
            });
            break;
        case "addChild":
            document.querySelectorAll(rule.selector).forEach((element) => {
                var template = document.createElement('template');
                template.innerHTML = rule.html.trim();
                element.appendChild(template.content.firstChild);
            });
            break;
        case "replaceContent":
            document.querySelectorAll(rule.selector).forEach((element) => {
                element.innerHTML = rule.html.trim();
            });
            break;
        default:
            console.error(`unknown action ${rule.action}`);
        }
    },
};
