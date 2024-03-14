import { ChatControl } from '../enums/API';

const ChatControlLabels: { [key in ChatControl]: string } = {
    [ChatControl.CHATBOT]: 'Chatbot',
    [ChatControl.START]: 'I\'m ready!',
    [ChatControl.YES]: 'Yes',
    [ChatControl.NO]: 'No',
    [ChatControl.FILES]: '',
    [ChatControl.WORD_LIMIT]: 'Word limit',
    [ChatControl.GOOD_AS_IS]: 'Good as is!',
    [ChatControl.EDIT_IT]: 'Let me edit it',
    [ChatControl.ADD_GUIDANCE]: 'Let me add some guidance',
    [ChatControl.OF_COURSE]: 'Of course I\'m ready!',
    [ChatControl.NUM_OF_TOKENS]: '',
    [ChatControl.NUM_OF_DOCS]: ''
};

export default ChatControlLabels;