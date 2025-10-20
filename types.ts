// This file can be used for custom type definitions.

export interface Finding {
    category: 'Positive' | 'Improvement' | 'Critical';
    text: string;
}
