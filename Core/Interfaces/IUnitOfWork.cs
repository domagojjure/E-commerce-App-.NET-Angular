using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IUnitOfWork : IDisposable // IDisposable is looking for dispose method and when the transaction is finished  it's going to dispose of the context 
    {
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity: BaseEntity;

        Task<int> Complete();
    }
}