import { ExtendedMessage } from "@/types/message";

export interface MessageProps {
  message: ExtendedMessage;
  isNextMessageSamePerson: boolean;
}
