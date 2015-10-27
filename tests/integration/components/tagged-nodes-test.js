import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tagged-nodes', 'Integration | Component | tagged nodes', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tagged-nodes}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tagged-nodes}}
      template block text
    {{/tagged-nodes}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
