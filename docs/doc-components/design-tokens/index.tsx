import { Colors, Variables } from '../../../packages/banana/styles/global-variables';
import './index.css';

const colors = ['Gray', 'Blue', 'Green', 'Orange', 'Red'] as const;

const type = ['Primary', 'Success', 'Warning', 'Danger'] as const;
const typeSubfix = ['', 'Hover', 'Active', 'Disabled'] as const;

export default function DesignTokens() {
  const colorTokens = colors.map((color) => {
    return (
      <div key={color} className="color-token">
        <h3 className="color-title">{color}[n] (n: 0-9)</h3>
        <div className="color-wrapper">
          {[...Array(10).keys()].map((index) => {
            return (
              <div
                key={index}
                className="color-item"
                style={{ backgroundColor: `rgba(${Colors[`${color}${index}` as keyof typeof Colors]}, 1)` }}
              ></div>
            );
          })}
        </div>
      </div>
    );
  });

  const typeTokens = type.map((type) => {
    return (
      <div key={type} className="type-token">
        <h3 className="type-title">{type}</h3>
        <div className="type-wrapper">
          {typeSubfix.map((subfix) => {
            return (
              <div key={subfix} className="type-item">
                <div
                  className="type-item-color-block"
                  style={{ backgroundColor: Variables[`Color${type}${subfix}`] }}
                ></div>
                <div className="type-item-text">
                  <div>{`Color${type}${subfix}`}</div>
                  <div className="color-code">{Variables[`Color${type}${subfix}`]}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div className="design-tokens">
      <h2>颜色变量 Color Tokens</h2>
      <div className="color-tokens">{colorTokens}</div>
      <br />
      <h2>主题变量 Theme Tokens</h2>
      <div className="type-tokens">{typeTokens}</div>
    </div>
  );
}
