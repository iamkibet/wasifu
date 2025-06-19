import { useEffect, useState } from 'react';

interface TypingEffectProps {
    text: string;
    className?: string;
    typingSpeed?: number;
    startDelay?: number;
}

const TypingEffect = ({ text, className = '', typingSpeed = 100, startDelay = 0 }: TypingEffectProps) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(
                () => {
                    setCurrentText((prev) => prev + text[currentIndex]);
                    setCurrentIndex((prev) => prev + 1);
                },
                currentIndex === 0 ? startDelay : typingSpeed,
            );

            return () => clearTimeout(timeout);
        } else {
            // Reset animation after completion
            const timeout = setTimeout(() => {
                setCurrentText('');
                setCurrentIndex(0);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, typingSpeed, startDelay]);

    return <span className={`inline-block ${className}`}>{currentText}</span>;
};

export default TypingEffect;
