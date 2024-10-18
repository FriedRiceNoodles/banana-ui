/* eslint-env node */

const template = () => `import { css, unsafeCSS } from 'lit';
import componentStyles from '../../styles/components.styles';
import { Colors, Variables as Var } from '../../styles/global-variables';

export default [
  componentStyles,
  css\`
    :host {
      color: rgba(\${unsafeCSS(Colors.Red5)});
      line-height: \${unsafeCSS(Var.LineHeightDense)};
    }
  \`,
];`;

module.exports = template;
