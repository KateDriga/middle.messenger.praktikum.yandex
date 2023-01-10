interface IUserMessage {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: IUserMessage;
    time: string;
    content: string;
  };
}
