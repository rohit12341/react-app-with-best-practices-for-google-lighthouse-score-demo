import React, {Suspense} from 'react';
import {connect} from 'react-redux';
import {getData} from './actions/action';
const Item = React.lazy(() => import('./item'));
const Filter = React.lazy(() => import('./filter'));


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      launch_year:'',
      launch_success:'',
      landing:'',
      limit:'100',
      status:null,
      data:[],
      current:[],
      loading:false,
      count:12,
      hasMoreData:true,
      years:[2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
    }
   }


   componentDidMount(){
     this.props.getData({limit:this.state.limit});
     window.addEventListener('scroll', () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
      return;
  
      this.loadMoreColleges();
    });  
   }

   loadMoreColleges=()=>{
    if(this.state.count >= this.state.data.length){
      this.setState({ hasMoreData: false });      
    } else {
    this.setState({ loading: true });
    let c = this.state.count+12;
    let data = this.state.data.slice(0, c);
    setTimeout(() => {
        this.setState({ current:data, count:c, loading: false, hasMoreData:true });
    }, 1000);
  }
   }

   componentWillUnmount() {
    window.removeEventListener('scroll');
}

   static getDerivedStateFromProps(nextProps, prevstate){
     return {
       status:nextProps.status,
       data:nextProps.data,
       current:nextProps.data.slice(0, prevstate.count)
     }
   }

   handleChange = (e) => {
     const {name, value } = e.target;
     this.props.getData({limit:this.state.limit, name, value});
   }


renderData(status, data){
  if(status === null)
     return <span>we are Loading data ...</span> 
  if(status && data.length>0 ) { 
    return data.map((item, i)=>{
       return <Item key={i} data={item} />
     })
   } else 
     return <span>no data Found</span> 
}

render(){
  const { years, status, current } = this.state;

  return (
    <div className="container" >
    <h3 className="heading">SpacEx launch programs</h3>
    <div className="row wrapper">
    <Suspense fallback={<div>Loading...</div>}>
     <Filter years={years} handleChange={this.handleChange} />
    </Suspense>

     <Suspense fallback={<div>Loading...</div>}>
     <div className="col-md-10 data-wrapper">
       {this.renderData(status, current)}
       {this.state.loading ? <div className="loader"> Loading ...</div>: null}
     </div>
     </Suspense>
    </div>
  </div>
  );
}
}


const getState = (state) => {
  return {
    status: state.getData.status,
    data:state.getData.data
  }
}


export default connect(getState, {getData})(App);
