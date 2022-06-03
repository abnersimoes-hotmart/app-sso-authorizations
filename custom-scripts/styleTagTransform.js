/* eslint-disable */

var css = require('css')
var cssParse = css.parse
var cssStringify = css.stringify

function processRules(list, options) {
  return list.map(function (r) {
    if (r.selectors) {
      r.selectors.forEach(function (s, index) {
        var selector = options.selector ? options.selector + ' ' + s : s

        r.selectors[index] = selector
      })
    }
    if (r.type === 'media') {
      r.rules = processRules(r.rules, options)
    }
    return r
  })
}
function cssWrap(string, options) {
  var css = cssParse(string)

  css.stylesheet.rules = processRules(css.stylesheet.rules, options)

  return cssStringify(css)
}

module.exports = function (css, style) {
  var vulcanoMain = document.querySelector('.my-shadow-root')
  var bwEnvironment = document.getElementById('business-workspace')

  if (vulcanoMain && !bwEnvironment) {
    style.innerHTML = css
    vulcanoMain.shadowRoot.appendChild(style)
  }

  if (bwEnvironment) {
    if (this.attributes['is-from-cosmos'] === 'true') {
      style.remove()
      return
    }
    style.removeAttribute('is-from-cosmos')

    var idSelector = this.attributes.from

    var cssWrappered = cssWrap(css, { selector: '#' + idSelector })

    style.innerHTML = cssWrappered

    document.head.appendChild(style)
  }
}
