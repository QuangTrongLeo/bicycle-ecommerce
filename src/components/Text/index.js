import classNames from 'classnames/bind';
import styles from './gradient.module.scss';

const st = classNames.bind(styles);

function GradientText({ text, fontSize = 50, colorWord = 0, wordsPerLine = 0, fullColorWord = false }) {
    const words = text.split(/\s+/);

    wordsPerLine = wordsPerLine > 0 ? wordsPerLine : words.length;
    colorWord = fullColorWord ? words.length : Math.min(colorWord, words.length - 1);
    // chỉ chia thành 2 dòng
    const firstLine = words.slice(0, wordsPerLine).join(' ');
    const secondLine = words.slice(wordsPerLine).join(' ');

    // render line 1 (có gradient)
    const renderFirstLine = (line) => {
        const parts = line.split(' ');
        const first = parts.slice(0, colorWord).join(' ');
        const rest = parts.slice(colorWord).join(' ');

        return (
            <>
                <span className={st('gradient')}>{first}</span>
                {rest && <span className={st('gray')}> {rest}</span>}
            </>
        );
    };

    const renderSecondLine = (line) => <span className={st('gray')}>{line}</span>;

    return (
        <div className={st('wrapper')} style={{ fontSize: `${fontSize}px` }}>
            <div>{renderFirstLine(firstLine)}</div>
            {secondLine && <div>{renderSecondLine(secondLine)}</div>}
        </div>
    );
}

export default GradientText;
