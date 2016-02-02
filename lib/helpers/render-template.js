// just expand to multiple require calls, one for each matched file
require('../templates/*.html', {mode: 'expand'});

module.exports = function(tpl, replacements, template) {

  if (!template) {
     tpl = '../templates/' + tpl + '.html';
     template = require(tpl);
  }

  for (var replacement in replacements) {
    template = template.replace("[[" + replacement + "]]", replacements[replacement]);
  }

return template;

}
