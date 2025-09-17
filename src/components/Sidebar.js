import { __experimentalListView as ListView } from '@wordpress/block-editor';

const Sidebar = ({ blocks }) => {
    return (
        <div >
            <h3>List View</h3>
            <ListView blocks={blocks} />
        </div>
    );
};
export default Sidebar;