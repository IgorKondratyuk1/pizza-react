import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={470}
        viewBox="0 0 280 490"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="135" cy="145" r="125" />
        <rect x="0" y="295" rx="10" ry="10" width="280" height="28" />
        <rect x="0" y="344" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="453" rx="10" ry="10" width="65" height="30" />
        <rect x="125" y="445" rx="25" ry="25" width="150" height="45" />
    </ContentLoader>
)

export default PizzaSkeleton;