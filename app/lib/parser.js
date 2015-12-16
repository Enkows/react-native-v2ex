import cheerio from 'cheerio';


const replaceHtmlEntities = (function() {
  const translateRegex = /&(nbsp|amp|quot|lt|gt);/g;
  const translate = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
  };
  return function(s) {
    return ( s.replace(translateRegex, function(match, entity) {
      return translate[entity];
    }) );
  };
})();

const replaceLinksAndImages = function(elem) {
  elem.find('a, img').each((i, target) => {
    switch (target.name) {
    case 'img':
      cheerio(target).replaceWith(`[img=${target.attribs.src}]`);
      break;
    case 'a':
      cheerio(target).replaceWith(`[url=${target.attribs.href}]`);
      break;
    default:
    }
  });
  return elem;
};

export function getTopicList(html) {
  const topics = [];
  const $ = cheerio.load(html, {decodeEntities: false});
  $('.cell.item').each((i, elem) => {
    const ctx = $(elem);

    const topicUri = ctx.find('.item_title a').attr('href');
    const topicTitle = replaceHtmlEntities(ctx.find('.item_title a').text());
    const topicTime = ctx.find('.small.fade').text().split('&nbsp;•&nbsp;')[2].replace(/\s/g, '');

    const nodeName = ctx.find('.small.fade .node').html();
    const nodeUri = ctx.find('.small.fade .node').attr('href');

    const authorName = ctx.find('.small.fade strong').eq(0).find('a').html();
    const authorUri = `https://v2ex.com/member/${authorName}`;
    const authorAvatar = 'http:' + ctx.find('.avatar').attr('src').replace('normal', 'large');

    topics.push({
      id: topicUri.match(/\/t\/(.*)#/)[1],
      uri: topicUri,
      title: topicTitle,
      time: topicTime,
      node: {
        name: nodeName,
        uri: nodeUri,
      },
      author: {
        avatar: authorAvatar,
        name: authorName,
        uri: authorUri,
      },
    });
  });

  return topics;
}


export function getTopicDetail(html) {
  const $ = cheerio.load(html, {decodeEntities: false});

  const topicContent = replaceHtmlEntities(
    replaceLinksAndImages($('.cell .topic_content')).text()
  );

  const addition = [];
  $('.subtle').each((i, elem) => {
    const ctx = replaceLinksAndImages($(elem));
    addition.push({
      title: replaceHtmlEntities(ctx.find('.fade').text()),
      content: replaceHtmlEntities(
        ctx.find('.topic_content').text()
      ),
    });
  });

  return {
    content: topicContent,
    addition: addition,
    comments: [],
  };
}
