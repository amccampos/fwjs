interface TabProps {
  tabContent: string
}

export function Tab(props: TabProps) {
  return (
    <div className="question">
      <h2>{ props.tabContent }</h2>
    </div>
  );
}
