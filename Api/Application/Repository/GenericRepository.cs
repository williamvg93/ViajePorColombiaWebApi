using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.entities;
using Domain.interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence.data;

namespace Application.Repository
{
    public class GenericRepository <T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ApiVpcContext _context;
    
        public GenericRepository(ApiVpcContext context)
        {
            _context = context;
        }
    
        public virtual void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }
    
        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }
    
        public virtual async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }
    
    
        public virtual void Remove(T entity)
        {
            _context.Set<T>().Remove(entity);
        }
    
    
        public virtual void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }
    }
}