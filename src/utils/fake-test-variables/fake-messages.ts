// TODO replace with message structure
export interface IMessage {
  time: string;
  type: 'message' | 'file';
  content: string;
}

export const FAKE_MESSAGES_SENT: Array<IMessage> = [
  { time: '2023-01-04T14:22:22.000Z', content: 'Hi', type: 'message' },
  {
    time: '2023-01-04T14:25:22.000Z',
    type: 'message',
    content:
      'Christmas is the only time of year in which one can sit in front of a dead tree and eat candy out of socks. Enjoy!',
  },
  {
    time: '2023-01-11T14:35:22.000Z',
    type: 'message',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    time: '2023-01-11T18:25:22.000Z',
    content: 'How are you?',
    type: 'message',
  },
];

export const FAKE_MESSAGES_RECEIVED: Array<IMessage> = [
  {
    time: '2023-01-07T14:28:22.000Z',
    type: 'message',
    content:
      'Merry Christmas! Wishing you all the happiness your holiday can hold!',
  },
  {
    time: '2023-01-11T16:22:22.000Z',
    type: 'message',
    content:
      'Turpis massa sed elementum tempus egestas sed sed risus. Mauris rhoncus aenean vel elit scelerisque mauris. Lectus magna fringilla urna porttitor rhoncus dolor purus non. Volutpat consequat mauris nunc congue nisi. At quis risus sed vulputate odio ut enim blandit. Tortor consequat id porta nibh venenatis cras sed felis. Arcu ac tortor dignissim convallis. Neque laoreet suspendisse interdum consectetur libero id. Tellus cras adipiscing enim eu turpis egestas pretium. Pharetra vel turpis nunc eget lorem. Nec feugiat nisl pretium fusce id velit. Amet consectetur adipiscing elit pellentesque habitant morbi tristique.',
  },
  {
    time: '2023-01-11T20:12:22.000Z',
    type: 'message',
    content: 'Thanks for asking! I’m excellent. How about you?',
  },
];
