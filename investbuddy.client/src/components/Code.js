import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importation dynamique de PrismJS pour s'assurer qu'il est chargé côté client uniquement
const Prism = dynamic(() => import('prismjs'), { ssr: false });

const Code = ({ language, className, children, style }) => {
  useEffect(() => {
    // Vérifier que Prism est disponible avant de l'utiliser
    if (Prism) {
      require('prismjs/plugins/line-numbers/prism-line-numbers.min.js');
      require('prismjs/plugins/toolbar/prism-toolbar.min.js');
      require('prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js');
      require('prismjs/components/prism-jsx.min');
      require('prismjs/plugins/line-numbers/prism-line-numbers.css');
      require('prismjs/plugins/toolbar/prism-toolbar.css');
      
      Prism.highlightAll();
    }
  }, [children]);

  return (
    <pre className={`line-numbers ${className}`} style={style}>
      <code className={`language-${language}`}>{children}</code>
    </pre>
  );
};

export default Code;
