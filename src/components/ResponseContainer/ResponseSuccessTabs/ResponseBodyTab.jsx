import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import { Controlled as ControlledCodeMirror } from 'react-codemirror2';
import '../../../style/codemirror.scss';
import { useData } from '../../../contexts/DataContext';
import '../../../style/responsebodytab.scss';
import '../../ResponseContainer/Response';

export default function ResponseBodyTabs() {
  const { resultData } = useData('');

  return (
    <div>
      <div style={{ marginTop: '0.1px' }}>
        <ControlledCodeMirror
          value={resultData}
          options={{
            mode: 'javascript',
            theme: 'default',
            lineNumbers: true,
            readOnly: true,
          }}
          onBeforeChange={() => {}}
          className="custom-codemirror"
        />
      </div>
    </div>
  );
}
