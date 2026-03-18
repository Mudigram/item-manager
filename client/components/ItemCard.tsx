import React from 'react';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <div className="premium-card group">
      <div className="space-y-4">
        <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
          {item.description || "No description provided."}
        </p>
        <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center text-[10px] font-bold text-indigo-600 border border-indigo-100">
              {item.username.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-semibold text-slate-700">{item.username}</span>
          </div>
          <time className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </time>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
