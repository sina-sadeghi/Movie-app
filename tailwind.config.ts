import type {Config} from 'tailwindcss'
import {PluginAPI} from "tailwindcss/types/config";

const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#ffffff',
        slate: colors.neutral,
        red: colors.red,
        blue: colors.blue,
        green: colors.green,
        yellow: colors.yellow,
        orange: colors.orange,
        color1: '#0C356A',
        color2: '#0174BE',
        color3: '#FFC436',
        color4: '#FFF0CE',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [plugin(function ({addUtilities}: PluginAPI) {
    addUtilities({
      '.zoomAble:hover': {
        transition: 'transform 0.3s linear',
        transform: 'perspective(500px) translateZ(30px)',
      }
    })
  })],
}
export default config
