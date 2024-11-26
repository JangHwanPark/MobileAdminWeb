type Props = {
    title: string;
    props: number;
}

const DataCard = ({title, props}: Props) => {
    return (
        <div className="col-12 lg:col-6 xl:col-3">
            <div>
                <span>{title}</span>
                <div>{props}</div>
            </div>
        </div>
    );
};

export default DataCard;