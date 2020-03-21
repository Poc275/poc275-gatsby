import Typography from 'typography'
import fairyGatesTheme from 'typography-theme-fairy-gates'

const typography = new Typography({
    ...fairyGatesTheme,
    scaleRatio: 3.05,
    overrideThemeStyles: () => ({
        h1: {
            fontSize: '3.052em',
        },
        h2: {
            fontSize: '2.441em',
        },
        h3: {
            fontSize: '1.953em',
        },
        h4: {
            fontSize: '1.563em',
        },
        h5: {
            fontSize: '1.25em',
        },
        // override anchor text shadow
        a: {
            textShadow: null,
        },
    }),
})

export const { scale, rhythm, options } = typography
export default typography
