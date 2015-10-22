import Ember from 'ember';

export function tagMatch(tag, nodeTags) {
  return nodeTags.contains(tag);
}

export default Ember.Helper.helper(tagMatch);
