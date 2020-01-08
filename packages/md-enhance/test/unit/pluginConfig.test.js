import { expect } from 'chai';
import resolveConfig from '../../src/pluginConfig';

describe('Test pluginConfig generate', () => {
  it('Should use plugin options first', () => {
    const option = {
      enableAll: true
    };

    const ctx = {
      themeConfig: {
        markdown: {
          enableAll: false
        }
      }
    };

    const pluginConfig = resolveConfig(option, ctx);

    expect(pluginConfig).to.be.deep.equal([
      [
        'container',
        {
          type: 'tip',
          defaultTitle: {
            '/': '提示',
            '/zh/': '提示',
            '/en/': 'Tips'
          }
        }
      ],
      [
        'container',
        {
          type: 'warning',
          defaultTitle: {
            '/': '注意',
            '/zh/': '注意',
            '/en/': 'Note'
          }
        }
      ],
      [
        'container',
        {
          type: 'danger',
          defaultTitle: {
            '/': '警告',
            '/zh/': '警告',
            '/en/': 'Warning'
          }
        }
      ],
      ['container', { type: 'right', defaultTitle: '', marker: '~' }],
      ['container', { type: 'center', defaultTitle: '', marker: '~' }],
      ['mathjax', true]
    ]);
  });

  it('should handle baseLang option', () => {
    const option = {
      enableAll: true
    };

    const ctx = {
      themeConfig: {
        baseLang: 'en-US',
        markdown: {
          enableAll: false
        }
      }
    };

    const pluginConfig = resolveConfig(option, ctx);

    expect(pluginConfig).to.be.deep.equal([
      [
        'container',
        {
          type: 'tip',
          defaultTitle: {
            '/': 'Tips',
            '/zh/': '提示',
            '/en/': 'Tips'
          }
        }
      ],
      [
        'container',
        {
          type: 'warning',
          defaultTitle: {
            '/': 'Note',
            '/zh/': '注意',
            '/en/': 'Note'
          }
        }
      ],
      [
        'container',
        {
          type: 'danger',
          defaultTitle: {
            '/': 'Warning',
            '/zh/': '警告',
            '/en/': 'Warning'
          }
        }
      ],
      ['container', { type: 'right', defaultTitle: '', marker: '~' }],
      ['container', { type: 'center', defaultTitle: '', marker: '~' }],
      ['mathjax', true]
    ]);
  });
});