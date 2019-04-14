import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

export default class Todo extends React.PureComponent {
    // toggle a todo as completed or not via update()
    toggleComplete() {
        this.props.doc.ref.update({
            complete: !this.props.quantity,
        });
    }

    render() {
        return (
          <TouchableHighlight
            onPress={() => this.toggleComplete()}
          >
              <View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 8 }}>
                      <Text>{this.props.name}</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text>{this.props.quantity} </Text>
                  </View>
              </View>
          </TouchableHighlight>
        );
    }
}

// export default Todo;