import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"
import theme from '../theme';

function BeerpongTable(props) {
  return (
    <Svg
      viewBox="0 0 210 297"
          width="80%"
      height="80%"
      {...props}
    >
      <G stroke="#000">
        <Rect
          width={158.75}
          height={243.417}
          x={26.458}
          y={26.458}
          ry={0}
          fill="none"
          strokeWidth={1.999}
        />
        <Path d="M185.208 148.167H26.458" fill="none" strokeWidth={1.967} />
        <Path
          transform="matrix(2 0 0 1.86667 -60.006 -233.892)"
          d="M82.92 230.188l11.457 19.843 11.456 19.844H60.006l11.457-19.844z"
          fill={theme.colors.cupRed}
          strokeWidth={1.035}
        />
        <Path
          transform="matrix(2 0 0 -1.86667 -59.687 530.225)"
          d="M82.92 230.188l11.457 19.843 11.456 19.844H60.006l11.457-19.844z"
          fill={theme.colors.cupBlue}
          strokeWidth={1.035}
        />
      </G>
    </Svg>
  )
}

export default BeerpongTable;
