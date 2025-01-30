import useStore from '../../../store/store.ts';
import { SettingItem } from './SettingItem.tsx';
import { getNamesOfFields } from '../../../schema/settings.ts';

export const Settings = () => {
    const bears = useStore((state) => state.bears);
    const settings = useStore((state) => state.settings);
    const inc = useStore((state) => state.increase);

    if (Object.keys(settings).length === 0) {
        return <p>loading...</p>;
    }

    return (
        <>
            <p>There are {bears} bears!</p>
            <button onClick={() => inc(1)}>add a bear</button>
            <br />
            <br />
            {getNamesOfFields().map((s) => (
                <>
                    <SettingItem
                        id={settings[s].field}
                        title={settings[s].title}
                        visible={settings[s].visible}
                        disabled={settings[s].disabled}
                    />
                    <br />
                </>
            ))}
        </>
    );
};
