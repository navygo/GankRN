import React, {PureComponent} from "react";
import {Image, Platform, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import {Actions} from "react-native-router-flux";
import {C1, C3} from "../../configs";

export default class GankItemView extends PureComponent {

    render(): React.ReactNode {

        return (
            <TouchableNativeFeedback
                onPress={() => {
                    Actions.webView({"url": this.props.item.url, "title": this.props.item.desc})
                }}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.items}>
                    <View style={styles.a}>
                        <Text
                            numberOfLines={3}
                            style={{
                                color: C1,
                                fontSize: 16,
                                lineHeight: 20,
                                flex: 1,
                            }}>{this.props.item.desc}</Text>
                        {this.props.item.images != null ?
                            <Image
                                defaultSource={require('../../image/fuli.png')}
                                source={{uri: this.props.item.images[0]}}
                                style={{height: 90, width: 60, marginStart: 10}}
                                // 将图片降尺寸后再加载到内存中，就会减少很多内存开销
                                resizeMethod="resize"
                                resizeMode="contain"
                            /> : null}
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Text style={[styles.text, {flex: 1}]}>
                            {this.props.item.who} · {this.props.item.type}
                        </Text>
                        <Text style={styles.text}>
                            {this.props.item.publishedAt.substring(5, 10)}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

}

const styles = StyleSheet.create({
    items: {
        marginHorizontal: 10,
        marginTop: 10,
        elevation: 2,
        backgroundColor: 'white',
        flex: 1,
        padding: 10
    },
    a: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: C3, fontSize: 12,
    }
});