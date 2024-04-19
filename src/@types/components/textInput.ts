import type { InputHTMLAttributes, Ref } from "vue";

export interface TextInputProps extends /* @vue-ignore */ InputHTMLAttributes {
    onChange: (event: Event) => void;
    value?: string;
}