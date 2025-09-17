import { __experimentalListView as ListView } from '@wordpress/block-editor';

const Sidebar = ({ blocks }) => {
    return (
        <div style={{
            width: '300px',
            height: '100vh',
            overflowY: 'auto',
            backgroundColor: '#f1f1f1',
            borderRight: '1px solid #ccc',
            padding: '10px',
        }}>
            <h3>Document Overview</h3>
            <ListView blocks={blocks} />
        </div>
    );
};
export default Sidebar;