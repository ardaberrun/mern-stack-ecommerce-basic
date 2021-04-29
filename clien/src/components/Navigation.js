import React, { useEffect,useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getCategories} from '../redux/actions/categoryAction'
import {Menu} from 'antd';
import './Navigation.css'


export default function Navigation() {
  const state = useSelector((state) => state.category);
  const dispatch = useDispatch();
 

  const fetchProducts = useCallback(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  return (
     <Menu mode="horizontal" className="navigation">
     {state.categories && state.categories.map((category) => (
          <Menu.Item key={category.name}>
            <Link to={`/category/${category.slug}`} style={{textDecoration:"none"}}>
              {category.name}
            </Link>
          </Menu.Item>
        ))}
        </Menu>

  );
}