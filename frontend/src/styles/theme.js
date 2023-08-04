import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme(
    {
        colors: {
            white: 'rgb(246, 241, 241)',
            whiteBlue: 'rgb(175, 211, 226)',
            blue: 'rgb(25, 167, 206)',
            darkBlue: 'rgb(20, 108, 148)'
        },
        fontFamilies: {
            logoFont: "'Manrope', sans-serif",
        }
})