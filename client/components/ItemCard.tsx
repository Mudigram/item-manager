import React from 'react';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <div className="premium-card group h-full flex flex-col hover:scale-105 transition-transform duration-200">
      <div className="space-y-3 sm:space-y-4 flex-1">
        <h3 className="font-bold text-lg sm:text-xl text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
          {item.name}
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
          {item.description || "No description provided."}
        </p>
      </div>
      
      <div className="pt-3 sm:pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-50 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-indigo-600 border border-indigo-100 flex-shrink-0">
            {item.username.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate">
            {item.username}
          </span>
        </div>
        <time className="text-[9px] sm:text-[10px] font-medium text-slate-400 uppercase tracking-wider flex-shrink-0 ml-2">
          {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </time>
      </div>
    </div>
  );
};

export default ItemCard;
