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
            html: "hello people",
            flag: 'removeGuys',
        },
        {
            selector: '.warning',
            action: "replaceContent",
            html: "hello ladies",
            flag: 'makeGuysLadies',
        },
    ],
    flags: {
        removeGuys: {
            default: false,
            ruleset: [
                {
                    clauses: [
                        {
                            key: 'gender',
                            comparison: 'eq',
                            value: 'x',
                        },
                    ],
                    value: true,
                },
            ],
        },
        makeGuysLadies: {
            default: false,
            ruleset: [
                {
                    clauses: [
                        {
                            key: 'gender',
                            comparison: 'eq',
                            value: 'f',
                        },
                    ],
                    value: true,
                },
            ],
        },
    },
    flagValue(flag) {
        const flagDefinition = this.flags[flag];
        if (flagDefinition === undefined) console.error(`Unknown flag ${flag}`);
        let returnValue = flagDefinition.default;
        flagDefinition.ruleset.forEach((rule) => {
            const ruleApplies = rule.clauses.every((clause) => this.user[clause.key] == clause.value);
            if (ruleApplies) {
                returnValue = rule.value;
            }
        });
        console.log(flag, returnValue);
        return returnValue;
    },
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
            if (rule.flag && !this.flagValue(rule.flag)) return;
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
