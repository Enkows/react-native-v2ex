import React, { StyleSheet, Component, PropTypes, PixelRatio } from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';


const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 300,
    height: 225,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: '#CCCCCC',
    backgroundColor: '#CCCCCC',
  },
  anchor: {
    fontSize: 18,
    color: '#4183c4',
  },
  text: {
    fontSize: 18,
    lineHeight: 26,
  },
});

const { Text, View } = React;
export default class HTMLView extends Component {
  static propTypes = {
    children: PropTypes.string,
  }

  renderer(html = '') {
    const reg = /\[img[^\]]*\]/g;
    const images = html.match(reg);

    if (!images) {
      return (
        <Text style={styles.text}>{ html }</Text>
      );
    }

    const result = [];
    const texts = html.split(reg);

    texts.forEach((text, index) => {
      if (text && text !== ' ') {
        result.push(
          <Text style={styles.text} key={`TEXT_${index}`}>{ text }</Text>
        );
      }

      if (images[index]) {
        const src = images[index].substring(5, images[index].length - 1);
        result.push(
          <Image
            key={`IMAGE_${index}`}
            resizeMode="contain"
            style={styles.image}
            source={{uri: src}}
            indicator={ProgressBar} />
        );
      }
    });

    return result;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>{ this.renderer(this.props.children) }</View>
    );
  }
}
